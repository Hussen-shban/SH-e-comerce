// src/app/products/layout.jsx

import Nav from "../components/Nav";



export const metadata = {
    title: "cart",
    description: "exercitationem. Recusandae nam fuga impedit ipsa necessitatibus. Perferendis consequuntur est maiores",
};

export default function ProductsLayout({ children }) {
    return (
        <div>
            <Nav color={true} />
            {children}
        </div>
    );
}
