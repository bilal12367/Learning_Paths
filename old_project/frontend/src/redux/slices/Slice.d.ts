
interface ISearchSliceState {
    searchType: 'flight' | 'hotel' | 'bus' | 'taxi' | null,
    from: String | null,
    to: String | null,
    travelDate: String | null,
    passengers: any,

}
