import ProjectModel from '../models/project.model.js';

export const createProject = async ({name, userId}) => {
    if (!name) {
        console.log('Name is undefined');
        throw new Error('Name is required');
    }
    if (!userId) {
        throw new Error('User Id is required');
    }
    let project;
    try {
        project = await ProjectModel.create({name, users: [userId]});
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }
    return project;
}
