const db = require('../config/database');

const Categoria = {
 
    listarTodas: async () => {
        const result = await db.query('SELECT * FROM categorias ORDER BY nome ASC');
        return result.rows;
    },

   
    criar: async (nome, descricao) => {
        const query = 'INSERT INTO categorias (nome, descricao) VALUES ($1, $2) RETURNING *';
        const result = await db.query(query, [nome, descricao]);
        return result.rows[0];
    }
};

module.exports = Categoria;