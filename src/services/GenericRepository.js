export default class GenericRepository {
    constructor(dao, model) {
        this.dao = dao;
        this.model = model;
    }

    getAll = (params) => {
        return this.dao.getAll(params, this.model);
    }

    getBy = (params) => {
        return this.dao.findOne(params, this.model);
    }

    save = (data) => {
        return this.dao.save(data, this.model);
    }

    editOne = (params, entity, document) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findOneAndUpdate(params, document);
    }

    deleteOne = (params) => {
        return this.dao.deleteOne(params, this.model);
    }
}