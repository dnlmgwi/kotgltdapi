module.exports = {
    store: async (result) => {

        const details = await storeResult(result);

        return details;
    },
}

async function storeResult(result) {

    const dateTime = new Date(result.response_time);

    await strapi.entityService.create('api::payment.payment', {
        data: {
            conversation_id: result.conversation_id,
            response_code: result.response_code,
            response_desc: result.response_desc,
            response_time: dateTime
        },
    });

    return {
        'message': 'Payment Stored successfully',
    };

}

