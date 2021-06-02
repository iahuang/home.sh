/*
    Virtual Filesystem

    Uses window.localStorage: usually capped at around 5MiB

    Format:

    LocalStorage {
        'vfs::{type: "root", id: "1", parent: ""}': """,
        'vfs::{type: "file", name: "test.txt", parent: "1"}': <file contents>,
        'vfs::
    }
*/

export const prefix = "vfs::"; // used to distinguish localStorage entries

export interface VFSEntity {
    type: "root" | "file" | "dir";
    id: string;
    name: string;
    parent: string;
}

function randomItem<T>(items: T[]) {
    return items[Math.floor(Math.random() * items.length)];
}

class VFSEntityRegistry {
    _entityTable = new Map<string, VFSEntity>();
    _childTable = new Map<string, VFSEntity[]>();
    _rootId: string | null = null;

    constructor() {}

    getEntity(id: string) {
        let e = this._entityTable.get(id);

        if (!e) throw new Error(`No entity found with id "${id}"`);
        return e;
    }

    getRoot() {
        let id = this._rootId;

        if (!id) throw new Error(`Root entity has not been defined yet!`);

        return this.getEntity(id);
    }

    registerEntity(entity: VFSEntity) {
        this._entityTable.set(entity.id, entity);
        if (entity.parent) {
            if (this._childTable.has(entity.parent)) {
                this._childTable.get(entity.parent)!.push(entity);
            } else {
                this._childTable.set(entity.parent, [entity]);
            }
        }

        if (entity.type === "root") {
            this._rootId = entity.id;
        }
    }

    findChildEntity(parent: VFSEntity, childName: string) {
        let children = this._childTable.get(parent.id) || [];

        for (let child of children) {
            if (child.name === childName) {
                return child;
            }
        }

        return null;
    }

    unregisterEntity(entity: VFSEntity) {
        this._entityTable.delete(entity.id);

        let parentTable = this._childTable.get(entity.parent);

        if (parentTable) {
            this._childTable.set(
                entity.parent,
                parentTable.filter((e) => e.id !== entity.id)
            );
        }
    }

    getChildEntities(of: VFSEntity) {
        return this._childTable.get(of.id) || [];
    }
}

type PathLike = string | VFSPath;

export function toPath(p: PathLike) {
    if (typeof p === "string") {
        return new VFSPath(p);
    }
    return p;
}

export class VFSPath {
    absolute: boolean;
    path: string[];
    end: string;

    constructor(path: string) {
        path = path.trim();
        this.absolute = path.startsWith("/");
        if (path.startsWith("/")) path = path.substring(1);
        if (path.endsWith("/")) path = path.substring(0, path.length - 1);
        let parts = path.split("/");
        this.path = parts.slice(0, parts.length - 1);
        this.end = parts[parts.length - 1];
    }

    toString() {
        return (this.absolute ? "/" : "") + this.path.concat([this.end]).join("/");
    }

    join(_other: PathLike) {
        let other = toPath(_other);
        if (this.isRoot()) {
            return "/" + other.path.concat([other.end]).join("/");
        }
        return (this.absolute ? "/" : "") + this.path.concat([this.end, ...other.path, other.end]).join("/");
    }

    toAbsolute(_currentDir: PathLike) {
        let cwdPath = toPath(_currentDir);
        if (this.absolute) return this.toString();

        return new VFSPath(cwdPath.toString()).join(this);
    }

    isRoot() {
        return this.absolute && this.end === "" && this.path.length === 0;
    }
}

export class VFS {
    registry: VFSEntityRegistry;
    cwd: string;

    constructor() {
        this.registry = new VFSEntityRegistry();

        // init

        let ents = this.getAllEntities();
        let root: VFSEntity | null = null;

        // look for root dir

        for (let ent of ents) {
            if (ent.type === "root") {
                root = ent;
                break;
            }
        }

        // if root dir was not found, init file system
        if (root === null) {
            let ent = this.makeRootEntity();
            this.registry.registerEntity(ent);
            this._saveEntity(ent);
        } else {
            // build filesystem

            for (let ent of ents) {
                this.registry.registerEntity(ent);
            }
        }

        this.cwd = "/";
    }

    getEntityFromPath(_path: PathLike) {
        let path = toPath(_path);
        path = new VFSPath(path.toAbsolute(this.cwd));

        let currNode = this.registry.getRoot();
        for (let name of path.path) {
            let nextNode = this.registry.findChildEntity(currNode, name);
            if (!nextNode) {
                return null;
            }
            currNode = nextNode;
        }

        if (path.isRoot()) {
            return this.registry.getRoot();
        }

        return this.registry.findChildEntity(currNode, path.end);
    }

    _findContainerEntity(_path: PathLike) {
        let path = toPath(_path);
        path = new VFSPath(path.toAbsolute(this.cwd));

        let currNode = this.registry.getRoot();
        for (let name of path.path) {
            let nextNode = this.registry.findChildEntity(currNode, name);
            if (!nextNode) {
                return null;
            }
            currNode = nextNode;
        }
        return currNode;
    }

    exists(_path: string) {
        return this.getEntityFromPath(_path) !== null;
    }

    touch(_path: string) {
        if (this.exists(_path)) {
            return;
        }

        let path = new VFSPath(_path);

        // find the entity for the parent directory
        let container = this._findContainerEntity(_path);
        if (!container) throw new Error("Parent directory does not exist!");

        let newEnt = this.makeFileEntity(path.end, container);
        this.registry.registerEntity(newEnt);
        this._saveEntity(newEnt);
    }

    _mkdir(name: string, parent: VFSEntity) {
        let newEnt = this.makeDirEntity(name, parent);
        this.registry.registerEntity(newEnt);
        this._saveEntity(newEnt);
        return newEnt;
    }

    mkdir(_path: string) {
        if (this.exists(_path)) {
            return;
        }

        let path = new VFSPath(_path);

        let currNode = this.registry.getRoot();

        for (let node of path.path.concat(path.end)) {
            let child = this.registry.findChildEntity(currNode, node);
            if (!child) {
                child = this._mkdir(node, currNode);
            }
            currNode = child;
        }

        return currNode;
    }

    _writeFile(entity: VFSEntity, data: string) {
        if (entity.type !== "file") throw new Error("Cannot write to non-file");
        this._saveEntity(entity, data);
    }

    writeFile(path: string, data: string) {
        // Write data to a file, creating it if it doesn't exist.

        this.touch(path);
        this._writeFile(this.getEntityFromPath(path)!, data);
    }

    readFile(path: string) {
        let ent = this.getEntityFromPath(path)!;

        if (!ent) throw new Error("No such file or directory");
        if (ent.type !== "file") throw new Error("Cannot read from non-file");
        
        return localStorage.getItem(prefix+JSON.stringify(ent));
    }

    delete(_path: string) {
        let path = new VFSPath(_path);

        let ent = this.getEntityFromPath(_path);

        if (ent) {
            if (ent.type === "file") {
                this.registry.unregisterEntity(ent);
            } else {
                // recursively delete directory
            }
        } else {
            throw new Error("File does not exist!");
        }
    }

    listdir(path: PathLike) {
        let ent = this.getEntityFromPath(path);

        if (!ent) throw new Error("Directory does not exist!");
        if (ent.type === "file") throw new Error("Cannot list files of non-directory!");

        let children = this.registry.getChildEntities(ent);
        return children.map((ent) => this.pathOfEntity(ent));
    }

    pathOfEntity(entity: VFSEntity) {
        let path: string[] = [];
        let ent = entity;

        while (ent.type !== "root") {
            path = [ent.name].concat(path);
            ent = this.registry.getEntity(ent.parent);
        }

        return "/" + path.join("/");
    }

    isDir(_path: PathLike) {
        let path = toPath(_path);

        let ent = this.getEntityFromPath(path);
        if (!ent) throw new Error("Entity does not exist!");
        return ent.type !== "file";
    }

    generateID() {
        let chars = "1234567890abcdef".split("");
        let id = "";
        for (let i = 0; i < 16; i++) id += randomItem(chars);
        return id;
    }

    makeRootEntity(): VFSEntity {
        return {
            id: this.generateID(),
            type: "root",
            name: "/",
            parent: "",
        };
    }

    makeDirEntity(name: string, parentTo: VFSEntity): VFSEntity {
        return {
            id: this.generateID(),
            type: "dir",
            name: name,
            parent: parentTo.id,
        };
    }

    makeFileEntity(name: string, parentTo: VFSEntity): VFSEntity {
        return {
            id: this.generateID(),
            type: "file",
            name: name,
            parent: parentTo.id,
        };
    }

    _saveEntity(ent: VFSEntity, contents = "") {
        localStorage.setItem(prefix + JSON.stringify(ent), contents);
    }

    _deleteEntity(ent: VFSEntity) {
        localStorage.removeItem(prefix + JSON.stringify(ent));
    }

    getAllEntities() {
        return Object.keys(localStorage)
            .filter((key) => key.startsWith(prefix))
            .map((key) => {
                // remove prefix
                key = key.substring(prefix.length);
                return JSON.parse(key) as VFSEntity;
            });
    }
}
