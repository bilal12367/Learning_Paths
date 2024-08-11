import { Router } from "express";


const router = Router()

router.post("/test", (req,res) => {
    console.log("Main Router hit")
    res.status(200).json({
        data: "value"
    })
})

export default router;