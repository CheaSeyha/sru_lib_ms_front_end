import i18next from "i18next";
import i18nextBrowserLanguagedetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next.use(i18nextBrowserLanguagedetector).use(initReactI18next).init({
    debug:true,
    lng: "kh",
    resources:{
        en:{
            translation:{
                sruText: "SRU LIBRARY MANAGEMENT"
            }
        },
        kh:{
            translation:{
                sruText: "ប្រព័ន្ធគ្រប់គ្រងប័ណ្ណាល័យសកលវិទ្យាល័យស្វាយរៀង"
            }
        }
    }
})