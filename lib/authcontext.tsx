import {createContext, useContext, useState} from "react"


interface AuthContextInterface {
    token: any
    userRole: any
}

const defaultState = {
    token: null,
    userRole: null,
}

export const AuthContext = createContext<AuthContextInterface | null>(defaultState)
