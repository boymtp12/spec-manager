import { Select } from "@mui/material";

const myData = [
    { text: 'Books', value: 1 },
    { text: 'Movies, Music & Games', value: 2 },
    { text: 'Electronics & Computers', value: 3 },
    { text: 'Home, Garden & Tools', value: 4 },
    { text: 'Health & Beauty', value: 5 },
    { text: 'Toys, Kids & Baby', value: 6 },
    { text: 'Clothing & Jewelry', value: 7 },
    { text: 'Sports & Outdoors', value: 8 },
    { text: 'Automotive & Industrial', value: 9 }
];

const Test = () => {
    return (
        <Select
            data={myData}
            selectMultiple={true}
            touchUi={false}
        />
    )
}

export default Test
