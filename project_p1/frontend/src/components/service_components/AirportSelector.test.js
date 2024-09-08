
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchAirport from '../../redux/rtk_query/AirportApi'
import AirportSelector from './AirportSelector'


jest.mock('../../redux/rtk_query/AirportApi', () => ({
    ...jest.requireActual('../../redux/rtk_query/AirportApi'),
    useLazyAirportSearchQuery: jest.fn()
}))
const selectedAirport = {
    "_id": "66c81a96cb32d2b6a9c1d5f8",
    "icao": "K0M9",
    "iata": "",
    "name": "Delhi Municipal Airport",
    "city": "Delhi",
    "state": "Louisiana",
    "country": "US",
    "elevation": 91,
    "lat": 32.4107017517,
    "lon": -91.4987030029,
    "tz": "America/Chicago"
};
const mumbaiAirport = {
    "_id": "66c81a96cb32d2b6a9c1d5f9",
    "icao": "BOM",
    "iata": "",
    "name": "Mumbai Airport",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "IN",
    "elevation": 91,
    "lat": 42.4107017517,
    "lon": -81.4987030029,
    "tz": "India"
};
describe("Airport Selector Tests", () => {
    test("It Should Render Without Errors", () => {

        SearchAirport.useLazyAirportSearchQuery.mockReturnValue([jest.fn().mockImplementation(() => { }), { data: [], isLoading: false, isSuccess: true }])


        render(<AirportSelector selectedAirport={selectedAirport} onSelectionChange={() => { }} label={'from'} />)

        const text = screen.queryByText('from')
        expect(text).toBeInTheDocument()
    }),
    test("It Should Display The List of Airports on clicking.", () => {
        SearchAirport.useLazyAirportSearchQuery.mockReturnValue([jest.fn().mockImplementation(() => { }), { data: [mumbaiAirport], isLoading: false, isSuccess: true }])

        render(<AirportSelector selectedAirport={selectedAirport} onSelectionChange={() => { }} label={'from'} />)

        const div = screen.queryByText('from')
        fireEvent.click(div)

        const element = screen.queryByText(mumbaiAirport.name)
        expect(element).toBeInTheDocument()
    })

    test("It Should Display the selected airport after selection is made.", () => {
        SearchAirport.useLazyAirportSearchQuery.mockReturnValue([jest.fn().mockImplementation(() => { }), { data: [mumbaiAirport], isLoading: false, isSuccess: true }])
        const { rerender } = render(<AirportSelector onSelectionChange={()=>{changeProps()}} selectedAirport={selectedAirport} label={'from'} />)

        const changeProps = () => {
            rerender(<AirportSelector onSelectionChange={()=>{}} label={'from'} selectedAirport={mumbaiAirport}/>)
        }

        const div = screen.queryByText('from')
        fireEvent.click(div)

        const listItem = screen.queryByText(mumbaiAirport.city)
        fireEvent.click(listItem)

        const selectedAirportName = screen.getByTestId('city')
        expect(selectedAirportName).toHaveTextContent(mumbaiAirport.city)

    })
})