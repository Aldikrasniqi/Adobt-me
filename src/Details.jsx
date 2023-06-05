import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import ErrorBoundary from './ErrorBoundary';
import Carousel from './Carousel';
import fetchPet from './fetchPet';
import Modal from './Modal';

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const results = useQuery(['details', id], fetchPet);

  if (results.isLoading)
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default Details;
