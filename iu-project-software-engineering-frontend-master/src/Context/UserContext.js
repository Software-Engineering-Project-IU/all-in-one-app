/*
 *	UserContext.js
 *
 *	Ersteller:		      Kevin Krazius
 *	Erstellungsdatum:	  03-07-2024
 *	Info/Notizen:		    Komponente erstellt, welche die Userdaten aus der API-Anfrage erstellt
 *
 *	Editiert von:
 *	Editiert am:
 *	Info/Notizen:
 *
 */

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// UserContext erstellen
const UserContext = createContext();

/*  
    Contexts in React dienen dazu, Daten durch den Komponentenbaum zu leiten, ohne explizit alle 
    Ebenen manuell durchreichen zu müssen. Dies ist besonders nützlich für "globale" Daten wie 
    Benutzereinstellungen, UI-Themen, Authentifizierungsstatus usw.
*/

export const UserProvider = ({ children }) => {
  // Zustand für User
  const [users, setUsers] = useState([]);

  // Funktion zum Abrufen der Userdaten
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://13.60.42.97:3001/users");
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Userdaten:", error);
      }
    };
    fetchData();
  }, []);

  // Context-Objekt zurückgeben, das den Zustand und eine Methode zum Aktualisieren des Zustands enthält
  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );

  /*
      Der UserContext.Provider Komponente wird ein value-Objekt gegeben, das den users-Zustand enthält. 
      Alle untergeordneten Komponenten, die Teil von children sind, können diesen Zustand über den 
      Context abrufen, wodurch eine props-basierte Weitergabe vermieden wird.
  */
};

export default UserContext;
