import httpStatus from "http-status";
export const notFound = (req, res) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Route not found",
        errorDetails: {
            path: req.originalUrl,
            method: req.method,
        },
    });
};
//# sourceMappingURL=notFound.js.map