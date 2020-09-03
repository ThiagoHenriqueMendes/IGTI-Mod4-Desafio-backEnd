// import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import { gradeModel } from '../models/gradesModel.js';
// import { acountModel } from '../../../../../trabalho prático/Back/Models/accounts.js';
import { isNumber } from 'util';

const create = async (req, _resp) => {
  try {
    let body = await req.body;

    if (Object.keys(body).length === 0)
      _resp.status(400).send({ retorno: 'Requisição sem nenhuma informação' });
    else if (!body.hasOwnProperty('name') || body.name.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "name" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('subject') || body.subject.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "subject" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('type') || body.type.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "type" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('value') || !isNumber(body.value)) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "value" não informado ou valor vazio' });
    }
    const existGrade = await gradeModel.find({
      name: body.name,
      subject: body.subject,
      type: body.type,
      value: body.value,
    });
    if (existGrade.length > 0) {
      _resp.send({
        message: 'registro já inserito na base de dados',
        retorno: existGrade,
      });
    } else {
      const retorno = await gradeModel.insertMany({
        name: body.name,
        subject: body.subject,
        type: body.type,
        value: body.value,
      });
      _resp.send({ message: 'Grade inserido com sucesso', retorno: retorno });
    }
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    _resp
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /findAll`);
    const grades = await gradeModel.find({});
    res.send(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /findAll - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /findOne - ${id}`);
    const grades = await gradeModel.find({ _id: id });
    res.send(grades);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /findOne - ${JSON.stringify(error.message)}`);
  }
};

const findByName = async (req, res) => {
  // const id = req.params.id;

  try {
    // logger.info(`GET /grade?name - ${id}`);
    // console.log(id);
    // const grades = await gradeModel.find({ _id: id });
    res.send('entrou');
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /findByName - ${JSON.stringify(error.message)}`);
  }
};

const update = async (_req, _resp) => {
  const id = await _req.params.id;
  try {
    let body = await _req.body;

    if (Object.keys(body).length === 0)
      _resp.status(400).send({ retorno: 'Requisição sem nenhuma informação' });
    else if (!body.hasOwnProperty('name') || body.name.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "name" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('subject') || body.subject.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "subject" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('type') || body.type.length === 0) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "type" não informado ou valor vazio' });
    } else if (!body.hasOwnProperty('value') || !isNumber(body.value)) {
      _resp
        .status(400)
        .send({ retorno: 'parâmetro "value" não informado ou valor vazio' });
    }

    const data = await gradeModel.findByIdAndUpdate({ _id: Object(id) }, body, {
      new: true,
    });
    _resp.send({ message: 'Grade atualizada com sucesso', retorno: data });
  } catch (error) {
    _resp.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (_req, _resp) => {
  const id = await _req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    const data = await gradeModel.deleteOne({ _id: Object(id) });
    _resp.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (_req, _resp) => {
  try {
    logger.info(`DELETE /grade`);
    const data = await gradeModel.remove({});
    _resp.send(data);
  } catch (error) {
    _resp
      .status(500)
      .send({ message: 'Erro ao excluir todos as Grades' + error });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default {
  create,
  findAll,
  findOne,
  findByName,
  update,
  remove,
  removeAll,
};
