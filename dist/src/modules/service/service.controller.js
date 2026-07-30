import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { serviceService } from "./service.service";
const createService = catchAsync(async (req, res) => {
    const result = await serviceService.createService(req.user.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Service created successfully",
        data: result,
    });
});
const getAllServices = catchAsync(async (req, res) => {
    const result = await serviceService.getAllServices();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Services retrieved successfully",
        data: result,
    });
});
const getSingleService = catchAsync(async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
        throw new Error("Service id is required");
    }
    const result = await serviceService.getSingleService(serviceId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service retrieved successfully",
        data: result,
    });
});
const updateService = catchAsync(async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
        throw new Error("Service id is required");
    }
    const userId = req.user.id;
    const result = await serviceService.updateService(serviceId, userId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service updated successfully",
        data: result,
    });
});
const deleteService = catchAsync(async (req, res) => {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
        throw new Error("Service id is required");
    }
    const userId = req.user.id;
    await serviceService.deleteService(serviceId, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Service deleted successfully",
        data: null,
    });
});
export const serviceController = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService,
};
//# sourceMappingURL=service.controller.js.map