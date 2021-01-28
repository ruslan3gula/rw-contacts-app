import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contacts } from "../pages/Contacts";
import { rest } from "msw";
import { setupServer } from "msw/node";

const users = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Frederik",
      last: "Thomsen",
    },
    location: {
      street: {
        number: 5968,
        name: "Åbakken",
      },
      city: "Ishoej",
      state: "Sjælland",
      country: "Denmark",
      postcode: 41946,
      coordinates: {
        latitude: "-29.9304",
        longitude: "-151.7086",
      },
      timezone: {
        offset: "+4:00",
        description: "Abu Dhabi, Muscat, Baku, Tbilisi",
      },
    },
    email: "frederik.thomsen@example.com",
    login: {
      uuid: "5fa9f5c5-d295-4dfe-8dc8-23bc1a65f0cd",
      username: "silverleopard265",
      password: "steele",
      salt: "ZiMw275F",
      md5: "9d824d27bc6661057057982868e4ca3d",
      sha1: "6c12e2f2117c38d593b5b1308a438195ceb324fc",
      sha256:
        "126a89b0d5ec95962b28300616219d5f5b5bc38c4d83b15e50c1a9d8779f94c5",
    },
    dob: {
      date: "1957-08-19T10:05:38.321Z",
      age: 64,
    },
    registered: {
      date: "2014-04-15T15:46:29.901Z",
      age: 7,
    },
    phone: "06339078",
    cell: "42697617",
    id: {
      name: "CPR",
      value: "190857-7300",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/77.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/77.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/77.jpg",
    },
    nat: "DK",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "آرتين",
      last: "كامياران",
    },
    location: {
      street: {
        number: 8684,
        name: "میدان 15خرداد",
      },
      city: "خرم‌آباد",
      state: "کرمانشاه",
      country: "Iran",
      postcode: 84412,
      coordinates: {
        latitude: "-16.3636",
        longitude: "-72.4982",
      },
      timezone: {
        offset: "-12:00",
        description: "Eniwetok, Kwajalein",
      },
    },
    email: "artyn.kmyrn@example.com",
    login: {
      uuid: "9fbb1bb4-10a2-4080-9a5d-db8d1b81af42",
      username: "crazydog632",
      password: "zaphod",
      salt: "TF3eQHhN",
      md5: "3dc6019349bcccd98be93dcdc23c21e2",
      sha1: "33a01344e3589f6989b80a60805fd7105a6bba3b",
      sha256:
        "3b58ffee7de157080a892e7abf048c1a8c9916acf045843ea123b0edcbaffa9c",
    },
    dob: {
      date: "1956-07-14T16:15:37.314Z",
      age: 65,
    },
    registered: {
      date: "2012-12-26T18:57:19.024Z",
      age: 9,
    },
    phone: "064-47842996",
    cell: "0977-430-1556",
    id: {
      name: "",
      value: null,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/11.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/11.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/11.jpg",
    },
    nat: "IR",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Maeva",
      last: "Roy",
    },
    location: {
      street: {
        number: 1211,
        name: "Lake of Bays Road",
      },
      city: "Glenwood",
      state: "Nova Scotia",
      country: "Canada",
      postcode: "H0P 6R8",
      coordinates: {
        latitude: "16.4956",
        longitude: "-100.9109",
      },
      timezone: {
        offset: "-7:00",
        description: "Mountain Time (US & Canada)",
      },
    },
    email: "maeva.roy@example.com",
    login: {
      uuid: "91a76bd6-4efa-4cb7-9128-8b2cbcb31967",
      username: "brownpanda246",
      password: "sandrine",
      salt: "XkOgZ2MH",
      md5: "27d1c5da1a6582307c70305a70f6011b",
      sha1: "e8a80aa7e517a034b0f4b5d225ef30dcaec681d4",
      sha256:
        "55f991ed73f810ce0099aa5a8b27e0c44c493a559fae9e8e266cf6f85bd9776a",
    },
    dob: {
      date: "1945-07-02T23:52:51.113Z",
      age: 76,
    },
    registered: {
      date: "2008-08-11T11:50:31.473Z",
      age: 13,
    },
    phone: "963-400-9078",
    cell: "527-800-0298",
    id: {
      name: "",
      value: null,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/57.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/57.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/57.jpg",
    },
    nat: "CA",
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Siiri",
      last: "Salmi",
    },
    location: {
      street: {
        number: 4873,
        name: "Otavalankatu",
      },
      city: "Karstula",
      state: "Northern Ostrobothnia",
      country: "Finland",
      postcode: 52966,
      coordinates: {
        latitude: "88.8049",
        longitude: "108.6408",
      },
      timezone: {
        offset: "-3:30",
        description: "Newfoundland",
      },
    },
    email: "siiri.salmi@example.com",
    login: {
      uuid: "2a1dd98c-4b20-459f-9560-0f0cd84cd100",
      username: "yellowbird829",
      password: "boomer",
      salt: "WaK6NwBo",
      md5: "c136893da0af548d9e15b42e3f3f7236",
      sha1: "bff6f1c9011696b0fae6ab2ca8460abf88993208",
      sha256:
        "966b9e5efc5bb7f70e1a2267dcddeb9582540afc04ed3786ca30f1798a1625eb",
    },
    dob: {
      date: "1988-08-15T04:02:35.219Z",
      age: 33,
    },
    registered: {
      date: "2018-03-28T13:32:42.836Z",
      age: 3,
    },
    phone: "07-354-936",
    cell: "047-341-30-22",
    id: {
      name: "HETU",
      value: "NaNNA460undefined",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/10.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/10.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/10.jpg",
    },
    nat: "FI",
  },
];

const handlers = [
  rest.post("https://randomuser.me/api/?results=10", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: users,
      })
    );
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe(`contacts get data`, () => {
  test(`loading`, async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("circular-loader");

    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test(`success`, async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("circular-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();
    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    // screen.debug();
  });

  test(`fail`, async () => {
    server.use(
      rest.post("https://randomuser.me/api/?results=10", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "internal server error",
          })
        );
      })
    );

    render(<Contacts />);
    const loader = screen.getByTestId("circular-loader");
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });
});

describe(`contacs data view mode`, () => {
  test(`should equal grid`, async () => {
    render(<Contacts />);
    const loader = screen.getByTestId("circular-loader");

    await waitForElementToBeRemoved(loader);

    const toggleGrid = screen.queryByTestId("toggle-data-view-mode-grid");
    console.log(userEvent.click(toggleGrid));

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );
    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test(`should equal grid with local storage`, async () => {
    window.localStorage.setItem("dataViewMode", "table");
    render(<Contacts />);
    const loader = screen.getByTestId("circular-loader");

    await waitForElementToBeRemoved(loader);

    // const toggleGrid = screen.queryByTestId("toggle-data-view-mode-grid");
    // console.log(userEvent.click(toggleGrid));

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );
    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
  });
});
