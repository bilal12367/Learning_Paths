

export class CallApiService {

    public static async fetchNewData(): Promise<any> {
        await new Promise(resolve => {
            setTimeout(resolve, 2000);
        })

        const rowData = [
            { make: "Toyota", model: "F!!325234", price: 232399432, electric: true },
            { make: "Ferrari", model: "C!!233423", price: 7546, electric: true },
            { make: "Lambo", model: "E!!3253", price: 6546, electric: true },
            { make: "Maruti", model: "Z!!325234", price: 75647, electric: true },
            { make: "Porche", model: "K!!325234", price: 654654, electric: true },
        ]

        return rowData;
    }
}