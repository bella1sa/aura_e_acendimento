const db = require('../config/database');

const Pedido = {
    criar: async (cliente_nome, cliente_whatsapp, itens) => {
        const queryPedido = `
            INSERT INTO pedidos (cliente_nome, cliente_whatsapp) 
            VALUES ($1, $2) RETURNING *
        `;
        const resPedido = await db.query(queryPedido, [cliente_nome, cliente_whatsapp]);
        const novoPedido = resPedido.rows[0];

        for (let item of itens) {
            const queryItem = `
                INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) 
                VALUES ($1, $2, $3, $4)
            `;
            await db.query(queryItem, [novoPedido.id, item.produto_id, item.quantidade, item.preco_unitario]);
        }

        return novoPedido;
    },

    listarTodos: async () => {
        const query = `
            SELECT p.id, p.cliente_nome, p.cliente_whatsapp, p.status, p.criado_em,
                   JSON_AGG(JSON_BUILD_OBJECT('produto_id', ip.produto_id, 'quantidade', ip.quantidade, 'preco', ip.preco_unitario)) AS itens
            FROM pedidos p
            LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id
            GROUP BY p.id
            ORDER BY p.criado_em DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }
};

module.exports = Pedido;