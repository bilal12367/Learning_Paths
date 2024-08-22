import { Router } from "express";
import { SearchController } from "../controllers/SearchController";


const router = Router()

router.get("/searchAirport", SearchController.searchAirports)

router.post("/test", (req, res) => {
    console.log("Main Router hit")
    res.status(200).json({
        data: "value"
    })
})

export default router;