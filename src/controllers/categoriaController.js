const Categoria = require('../models/categoria');

const categoriaController = {
   
    listarTodas: async (req, res) => {
        try {
            const categorias = await Categoria.listarTodas();
            return res.json(categorias);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            return res.status(500).json({ mensagem: 'Erro interno no servidor' });
        }
    },


    criar: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            if (!nome) {
                return res.status(400).json({ mensagem: 'O nome da categoria é obrigatório.' });
            }
            const novaCategoria = await Categoria.criar(nome, descricao);
            return res.status(201).json(novaCategoria);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            return res.status(500).json({ mensagem: 'Erro ao criar categoria' });
        }
    }
};

module.exports = categoriaController;