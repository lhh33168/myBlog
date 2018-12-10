//延长session失效时间
module.exports = () => {
    return async function saveSession(ctx, next) {
        await next();
        // 如果 Session 是空的，则不更新有效时间
        if (!ctx.session || !ctx.session.populated) return;
        ctx.session.save();
    };
};