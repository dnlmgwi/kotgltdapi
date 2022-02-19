module.exports = {
    //TODO: Add Year to Parameter
    userEvents: async (userId) => {
        const entries = await strapi.db.query('api::event-registration.event-registration').findMany({
            select: ['id', 'reference', 'status', 'registered_at'],
            where: {
                user: {
                    id: userId,
                }
            },
            populate: {
                event: {
                    select: ['id', 'name', 'event_date', 'event_time'],
                },
                user: {
                    select: ['id', 'username',],
                }
            }
        });

        //If no entries found, return empty array
        if (entries.length === 0) {
            return [];
        }

        return entries;

    }
}
