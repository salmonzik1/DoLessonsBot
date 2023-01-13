import { Model, model, Schema } from 'mongoose';

Model.findOrCreate = function (query) {
    return this.findOneAndUpdate(
        query,
        {},
        {
            new: true,
            upsert: true,
        }
    );
};

export { model, Schema };
