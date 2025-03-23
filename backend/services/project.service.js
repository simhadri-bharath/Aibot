import ProjectModel from '../models/project.model.js';

import mongoose  from 'mongoose';
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
export const getAllProjectsByUserId = async ({userId}) => {
    if (!userId) {
        throw new Error('User Id is required');
    }
    const projects = await ProjectModel.find({users: userId});
    return projects;
}
export const addUserToProject = async ({projectId, users, userId}) => {
    if(!projectId){
        throw new Error('Project Id is required');
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Project Id is invalid');
    }
    if(!users){
        throw new Error('Users are required');
    }
    if(!userId){
        throw new Error('User Id is required');
    }
    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Users are invalid');
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error("Invalid user");
    }
    const project=await ProjectModel.findOne({
        _id:projectId,
        users:userId
    });
    if(!project){
        throw new Error("User not belong to this project");
    }
    const updatedProject=await ProjectModel.findOneAndUpdate({
        _id:projectId},
        {
            $addToSet:{
                users:{
                    $each:users
                }
            }
        },
        {new:true}
    )
    return updatedProject
}
export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await ProjectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}

export const updateFileTree = async ({ projectId, fileTree }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!fileTree) {
        throw new Error("fileTree is required")
    }

    const project = await ProjectModel.findOneAndUpdate({
        _id: projectId
    }, {
        fileTree
    }, {
        new: true
    })

    return project;
}