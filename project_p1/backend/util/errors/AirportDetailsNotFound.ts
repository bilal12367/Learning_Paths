

class AirportDetailsNotFound extends Error {
    constructor() {
        super()
        this.message = "Airport Not Found Exception!!"
    }
}

export default AirportDetailsNotFound;