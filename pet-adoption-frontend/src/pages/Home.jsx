import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets } from "../features/pets/petSlice";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";

const Home = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </>
  );
};

export default Home;
