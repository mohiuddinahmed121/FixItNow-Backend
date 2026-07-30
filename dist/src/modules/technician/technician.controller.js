import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { technicianService } from "./technician.service";
const updateProfile = catchAsync(async (req, res) => {
    const result = await technicianService.updateProfile(req.user.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile updated successfully",
        data: result,
    });
});
const getMyProfile = catchAsync(async (req, res) => {
    const result = await technicianService.getMyProfile(req.user.id);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician profile retrieved successfully",
        data: result,
    });
});
export const technicianController = {
    updateProfile,
    getMyProfile,
};
//# sourceMappingURL=technician.controller.js.map