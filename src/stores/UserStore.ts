import { createContext, useEffect, useState } from "react";
import { VerifiesDataSource } from "../datasource/VerifiesDataSource";
import { UserEntity } from "../entities/userEntity";


// initial state can be any primitive or non-primitive type
const initialState = VerifiesDataSource.getProfile().then((respone: UserEntity) => respone);
// const initialState = getProfile();






// context object
export const ThemeContext = createContext(initialState);

// provider component
// export const ThemeProvider = ThemeContext.Provider;

// consumer component
// export const ThemeConsumer = ThemeContext.Consumer;