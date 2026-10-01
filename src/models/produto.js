const db = require('../config/database');

const Produto = {
   
    listarTodos: async () => {
        const query = `
            SELECT p.*, c.nome AS categoria_nome 
            FROM produtos p 
            JOIN categorias c ON p.categoria_id = c.id 
            ORDER BY p.id DESC
        `;
        const result = await db.query(query);
        return result.rows;
    },
   
    buscarPorId: async (id) => {
        const query = 'SELECT * FROM produtos WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    },
   
    criar: async (dados) => {
        const { nome, descricao, aroma, preco, estoque, categoria_id } = dados;
        const query = `
            INSERT INTO produtos (nome, descricao, aroma, preco, estoque, categoria_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `;
        const values = [nome, descricao, aroma, preco, estoque, categoria_id];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    deletar: async (id) => {
        const query = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
};

module.exports = Produto;