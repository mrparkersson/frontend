import React, { useState } from 'react';
import styled from 'styled-components';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const GET_PEOPLE = gql`
  query GetPeople($page: Int) {
    people(page: $page) {
      name
      gender
      homeworld
      height
      mass
    }
  }
`;
const SEARCH_PEOPLE = gql`
  query SearchPeople($name: String!) {
    searchPeople(name: $name) {
      name
      gender
      homeworld
      height
      mass
    }
  }
`;

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const { data, loading, error } = useQuery(GET_PEOPLE);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery] = useLazyQuery(SEARCH_PEOPLE);

  if (loading) {
    return (
      <LoadingCenter>
        <RingItem></RingItem>
        <SpanItem>Loading...</SpanItem>
      </LoadingCenter>
    );
  }

  if (error) {
    <div>{error.message}</div>;
  }

  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
  };

  const searchPeopleHandler = async () => {
    const response = await searchQuery({ variables: { name: search } });
    setSearchData(response.data.searchPeople);
    setSearch('');
  };

  const onPersonClick = (person: any) => {};

  return (
    <div>
      <BodyContainer>
        <ItemContainer>
          <InputElement>
            <InputButton
              type="text"
              value={search}
              onChange={onSearchHandler}
            />
            <ButtonItem onClick={searchPeopleHandler}>Search</ButtonItem>
          </InputElement>
          <UlContainer className="ul-container">
            {(searchData.length ? searchData : data?.people).map(
              (human: any) => {
                return (
                  <div className="list-human">
                    <UlItems key={human.name}>
                      <li onClick={() => onPersonClick(human)}>{human.name}</li>
                      <li>{human.gender}</li>
                      <li>{human.mass}</li>
                      <li>{human.height}</li>
                      <li>{human.homeworld}</li>
                    </UlItems>
                  </div>
                );
              }
            )}
          </UlContainer>
        </ItemContainer>
      </BodyContainer>
    </div>
  );
};

const BodyContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-top: 40px;
`;

const RingItem = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation: ring 2s linear infinite;

  &:before {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }
`;

const SpanItem = styled.span`
  color: #737373;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 200px;
`;

const LoadingCenter = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const InputElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-left: 30px;
`;

const ButtonItem = styled.div`
  margin-right: 2rem;
  min-width: 5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: rgb(4, 10, 23);
  border-radius: 1rem;
  border: 2px solid rgb(4, 8, 17);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: rgb(5, 8, 13);
    color: white;
  }
`;

const InputButton = styled.input`
  margin-right: 2rem;
  min-width: 5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: white;
  color: rgb(65, 98, 168);
  border-radius: 1rem;
  border: 2px solid rgb(5, 11, 23);
  font-weight: bold;
  cursor: pointer;
  width: 25rem;
`;

const ItemContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const UlContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 2rem;
  margin: 2rem;
`;

const UlItems = styled.ul`
  border: 2px solid white;
  background: linear-gradient(73.25deg, #000000 7.24%, #4d4b4b 108.45%);
  color: white;
  border-radius: 1rem;
  position: relative;
  padding: 2rem;
  text-align: center;
  animation-name: container;
  animation-duration: 4s;
  animation-delay: -2s;

  & > li {
    list-style: none;
    cursor: pointer;
    font-size: 15px;
    padding: 0.6rem;
    background: linear-gradient(73.25deg, #000000 7.24%, #4d4b4b 108.45%);
    margin-top: 10px;
    border-radius: 2rem;
    text-overflow: inherit;
    border: 1px solid white;
  }
`;

export default Home;
