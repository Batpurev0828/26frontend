interface Props {
    title: string,
    category: string,
    price: number,
    image: string
}

export default function Card(props: Props) {
    return (
        <div className="p-4 flex flex-col max-w-full w-[440px] h-[440px] bg-white rounded-xl outline outline-black">
            <img className="w-full h-[240px] rounded-lg object-cover object-center" src={props.image}></img>
            <span className="font-semibold text-xl mt-2">{props.title}</span>
            <span className="">{`${props.price}$`}</span>
            <span className="mb-auto">{props.category}</span>
            <button className="w-full h-12 bg-white outline outline-black rounded-lg">
                <p>Add to cart</p>
            </button>
        </div>
    );
}