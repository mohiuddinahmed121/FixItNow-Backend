import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";
const createReview = catchAsync(async (req, res) => {
    const customerId = req.user.id;
    const result = await reviewService.createReview(customerId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review created successfully",
        data: result,
    });
});
const getTechnicianReviews = catchAsync(async (req, res) => {
    const { technicianProfileId } = req.params;
    const result = await reviewService.getTechnicianReviews(technicianProfileId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Reviews retrieved successfully",
        data: result,
    });
});
export const reviewController = {
    createReview,
    getTechnicianReviews,
};
//# sourceMappingURL=review.controller.js.map