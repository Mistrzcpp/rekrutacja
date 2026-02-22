// mappers.js
export function mapApiToForm(item) {
  if (!item) return {};

  return {
    // === WNIOSEK ===
    wniosek_id: item.wniosek_id || null,
    data: item.w_data || "",
    szkola: item.w_szkola || "",
    punkty: item.w_punkty || "",
    wiodacy_jezyk_obcy_id: item.w_wiodacy_jezyk || "angielski",
    dodatkowy_jezyk_obcy: item.w_dodatkowy_jezyk || "",
    pierwszy_wybor_szkoly: item.w_pierwszy_wybor || false,
    ocena_dodatkowa: item.w_ocena_dodatkowa || "",
    swiadectwo_z_wyroznieniem: item.w_wyroznienie || false,
    oryginal_swiadectwa: item.w_oryginal || false,
    szkola: item.w_szkola || "",

    // === KANDYDAT ===
    imie: item.k_imie || "",
    drugie_imie: item.k_drugie_imie || "",
    nazwisko: item.k_nazwisko || "",
    email: item.k_email || "",
    tel: item.k_telefon || "",
    pesel: item.k_pesel || "",
    data_urodzenia: item.k_data_urodzenia
      ? item.k_data_urodzenia.split("T")[0]
      : "",
    miejsce_urodzenia: item.k_miejsce_urodzenia || "",

    // === ADRES KANDYDATA ===
    miejscowosc: item.adres_miejscowosc || "",
    kod_pocztowy: item.adres_kod_pocztowy || "",
    ulica: item.adres_ulica || "",
    numer_domu: item.adres_nr_domu || "",
    numer_lokalu: item.adres_nr_lokalu || "",
    wojewodztwo: item.adres_wojewodztwo || "warmińsko-mazurskie",
    poczta: item.adres_poczta || "",
    gmina: item.adres_gmina || "",

    // === MATKA ===
    imie_matki: item.matka_imie || "",
    nazwisko_matki: item.matka_nazwisko || "",
    tel_matki: item.matka_telefon || "",
    inny_adres_matki: false,
    miejscowosc_matki: "",
    ulica_matki: "",
    numer_domu_matki: "",
    numer_lokalu_matki: "",
    kod_pocztowy_matki: "",
    gmina_matki: "",
    poczta_matki: "",
    wojewodztwo_matki: "",

    // === OJCIEC ===
    imie_ojca: item.ojciec_imie || "",
    nazwisko_ojca: item.ojciec_nazwisko || "",
    tel_ojca: item.ojciec_telefon || "",
    inny_adres_ojca: false,
    miejscowosc_ojca: "",
    ulica_ojca: "",
    numer_domu_ojca: "",
    numer_lokalu_ojca: "",
    kod_pocztowy_ojca: "",
    gmina_ojca: "",
    poczta_ojca: "",
    wojewodztwo_ojca: "",

    // === WYNIKI ===
    ocena_polski: item.k_ocena_polski || "",
    ocena_matematyka: item.k_ocena_matematyka || "",
    ocena_angielski: item.k_ocena_angielski || "",
    egzamin_polski: item.k_egzamin_polski || "",
    egzamin_matematyka: item.k_egzamin_matematyka || "",
    egzamin_angielski: item.k_egzamin_angielski || "",

    // === KIERUNKI ===
    kierunek_1: item.kierunek_1_id || "",
    kierunek_2: item.kierunek_2_id || "",
    kierunek_3: item.kierunek_3_id || "",
    ocena_dodatkowa: item.w_ocena_dodatkowa || "",
  };
}

// mappers.js
export function mapFormToApi(form) {
  if (!form) return {};

  return {
    // === WNIOSEK ===
    wniosek_id: form.wniosek_id || null,
    w_data: form.data ? form.data : "", // backend oczekuje ISO YYYY-MM-DD
    w_szkola: form.szkola || "",
    w_punkty: form.punkty || "",
    w_wiodacy_jezyk: form.wiodacy_jezyk_obcy_id || "angielski",
    w_dodatkowy_jezyk: form.dodatkowy_jezyk_obcy || "",
    w_pierwszy_wybor: form.pierwszy_wybor_szkoly || false,
    w_ocena_dodatkowa: form.ocena_dodatkowa || "",
    w_wyroznienie: form.swiadectwo_z_wyroznieniem || false,
    w_oryginal: form.oryginal_swiadectwa || false,

    // === KANDYDAT ===
    k_imie: form.imie || "",
    k_drugie_imie: form.drugie_imie || "",
    k_nazwisko: form.nazwisko || "",
    k_email: form.email || "",
    k_telefon: form.tel || "",
    k_pesel: form.pesel || "",
    k_data_urodzenia: form.data_urodzenia || "",
    k_miejsce_urodzenia: form.miejsce_urodzenia || "",

    // === ADRES KANDYDATA ===
    adres_miejscowosc: form.miejscowosc || "",
    adres_kod_pocztowy: form.kod_pocztowy || "",
    adres_ulica: form.ulica || "",
    adres_nr_domu: form.numer_domu || "",
    adres_nr_lokalu: form.numer_lokalu || "",
    adres_wojewodztwo: form.wojewodztwo || "warmińsko-mazurskie",
    adres_poczta: form.poczta || "",
    adres_gmina: form.gmina || "",

    // === MATKA ===
    matka_imie: form.imie_matki || "",
    matka_nazwisko: form.nazwisko_matki || "",
    matka_telefon: form.tel_matki || "",

    // === OJCIEC ===
    ojciec_imie: form.imie_ojca || "",
    ojciec_nazwisko: form.nazwisko_ojca || "",
    ojciec_telefon: form.tel_ojca || "",

    // === WYNIKI ===
    k_ocena_polski: form.ocena_polski || "",
    k_ocena_matematyka: form.ocena_matematyka || "",
    k_ocena_angielski: form.ocena_angielski || "",
    k_egzamin_polski: form.egzamin_polski || "",
    k_egzamin_matematyka: form.egzamin_matematyka || "",
    k_egzamin_angielski: form.egzamin_angielski || "",

    // === KIERUNKI ===
    kierunek_1_id: form.kierunek_1 || "",
    kierunek_2_id: form.kierunek_2 || "",
    kierunek_3_id: form.kierunek_3 || "",
  };
}
