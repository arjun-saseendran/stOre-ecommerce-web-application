

const UserHeader = () => {
  return (
    <nav>
      <div className="bg-blue-950 w-screen h-20 text-white flex justify-between text-xl items-center px-5">
        <div className="text-3xl">stOre</div>
        <div>
          <ul className="hidden md:flex gap-10 ">
            <li>Home</li>
            <li>Cart</li>
            <li>Orders</li>
            <li>Wishlist</li>
          </ul>
          </div>

          <div className="flex-1">
            Cart
          </div>
        

      </div>
    </nav>
  );
};

export default UserHeader;
