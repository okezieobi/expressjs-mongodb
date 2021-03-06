/* eslint-disable no-underscore-dangle */
import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('Authorized User should be able to create an entity', () => {
  it('Should be able to create a entity at "/api/v1/entities" if all required input fields are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/entities')
      .set('token', utils.token)
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['entity', 'status']);
    expect(data.status).toBeNumber().toEqual(201);
    expect(data.entity.title).toBeString().toEqual(utils.entity.title);
    expect(data.entity.body).toBeString().toEqual(utils.entity.body);
    expect(data.entity._id).toBeString();
    expect(data.entity.userId).toBeString();
    expect(data.entity.createdAt).toBeString();
    expect(data.entity.updatedAt).toBeString();
  });

  it('Should not create an entity at "/api/v1/entities" if input fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entities')
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeArray().toIncludeAllMembers([
      {
        msg: 'Entity title should be at least a character long',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entity title must be string data type',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entity title is required',
        param: 'title',
        location: 'body',
      },
      {
        msg: 'Entity body should be at least a character long',
        param: 'body',
        location: 'body',
      },
      {
        msg: 'Entity body must be string data type',
        param: 'body',
        location: 'body',
      },
      {
        msg: 'Entity body is required',
        param: 'body',
        location: 'body',
      },
    ]);
  });

  it('Should not create an entity at "/api/v1/entities" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entities')
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT create an entity at at "/api/v1/entities" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/entities')
      .set('token', utils.token401)
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeString().toEqual('User not found, please sign up by creating an account');
  });
});

describe('Authorized User should be able to get all associated entities', () => {
  it('Should get all associated entities at "/api/v1/entities" if input all required fields are valid', async () => {
    const { status, body: { data } } = await request(app).get('/api/v1/entities')
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entities']);
    expect(data.entities).toBeArray();
  });

  it('Should not get associated entities at "/api/v1/entities" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/entities');
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get all associated entities at at "/api/v1/entities" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).get('/api/v1/entities')
      .set('token', utils.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeString().toEqual('User not found, please sign up by creating an account');
  });
});

describe('Authorized User can get an associated, specific entity by its id', () => {
  it('Should get a specific entity at "/api/v1/entities/:id" by its id', async () => {
    const { status, body: { data } } = await request(app).get(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entity']);
    expect(data.entity.title).toBeString().toEqual(utils.entity.title);
    expect(data.entity.body).toBeString().toEqual(utils.entity.body);
    expect(data.entity._id).toBeString();
    expect(data.entity.userId).toBeString();
    expect(data.entity.createdAt).toBeString();
    expect(data.entity.updatedAt).toBeString();
  });

  it('Should not get associated, specific entity at "/api/v1/entities/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entities/${utils.seed.entityDoc._id}`);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT get associated, specific entities at at "/api/v1/entities/:id" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .set('token', utils.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeString().toEqual('User not found, please sign up by creating an account');
  });

  it('Should NOT get associated, specific entities at at "/api/v1/entities/:id" if entity does not exist', async () => {
    const { status, body: { error } } = await request(app).get(`/api/v1/entities/${utils.user404Doc._id}`)
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeString().toEqual('Entity not found');
  });
});

describe('Authorized User can update an associated, specific entity by its id', () => {
  it('Should update a specific entity at "/api/v1/entities:id" if all input fields are valid', async () => {
    const { status, body: { data } } = await request(app).put(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .set('token', utils.token)
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entity']);
    expect(data.entity.title).toBeString().toEqual(utils.entity.title);
    expect(data.entity.body).toBeString().toEqual(utils.entity.body);
    expect(data.entity._id).toBeString();
    expect(data.entity.userId).toBeString();
    expect(data.entity.createdAt).toBeString();
    expect(data.entity.updatedAt).toBeString();
  });

  // preceding tests is taken into account
  it('Should not update a specific entity at "/api/v1/entities:id" even if input fields are invalid', async () => {
    const { status, body: { data } } = await request(app).put(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .set('token', utils.token)
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['entity']);
    expect(data.entity.title).toBeString().toEqual(utils.entity.title);
    expect(data.entity.body).toBeString().toEqual(utils.entity.body);
    expect(data.entity._id).toBeString();
    expect(data.entity.userId).toBeString();
    expect(data.entity.createdAt).toBeString();
    expect(data.entity.updatedAt).toBeString();
  });

  it('Should not update associated, specific entity at "/api/v1/entities/:id" if token is falsy', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .send(utils.entity);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeArray().toIncludeAllMembers([
      {
        msg: 'Token must be string data type',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token does not match Json Web Token format',
        param: 'token',
        location: 'headers',
      },
      {
        msg: 'Token is required',
        param: 'token',
        location: 'headers',
      },
    ]);
  });

  it('Should NOT update associated, specific entity at at "/api/v1/entities/:id" if User is not authenticated', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entities/${utils.seed.entityDoc._id}`)
      .set('token', utils.token401);
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeString().toEqual('User not found, please sign up by creating an account');
  });

  it('Should NOT update associated, specific entity at at "/api/v1/entities/:id" if entity does not exist', async () => {
    const { status, body: { error } } = await request(app).put(`/api/v1/entities/${utils.seed.userDoc._id}`)
      .set('token', utils.token);
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeString().toEqual('Entity not found');
  });
});
