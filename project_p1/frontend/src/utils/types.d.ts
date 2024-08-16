import { ReactNode } from "react"



interface User {
    userName: String,
    userId: String,
    email: String
}

interface ISearchPageMenuItem {
    index: Number,
    id: String,
    name: String,
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export { User, ISearchPageMenuItem }