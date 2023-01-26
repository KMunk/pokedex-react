import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  CircularProgress,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PokemonClient } from "pokenode-ts";
import { useQuery } from "@tanstack/react-query";

const getPokemon = async () => {
  const metaPokemonData = [];
  const api = new PokemonClient();
  const pokemons = await api.listPokemons(0, 10);

  for (const pokemon of pokemons.results) {
    metaPokemonData.push(await api.getPokemonByName(pokemon.name));
  }

  return metaPokemonData.filter((pokemon) => pokemon.is_default);
};

function App() {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });

  if (isLoading) {
    return (
      <CircularProgress isIndeterminate color="green.300"></CircularProgress>
    );
  }

  if (data) {
    let pokemon = data;
    console.log(pokemon);
    return (
      <>
        <HStack flexWrap="wrap">
          {pokemon.map((p) => (
            <Card key={p.id} background="red.300" margin={"8"}>
              <CardBody>
                <VStack>
                  <Image
                    boxShadow={"md"}
                    padding="1.5"
                    color={"rebeccapurple"}
                    bgColor="rebeccapurple"
                    borderRadius="md"
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${p.id
                      .toString()
                      .padStart(3, "0")}.png`}
                  />
                  <Text>{p.name}</Text>
                </VStack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Add to Pokedex
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </HStack>
      </>
    );
  }

  return (
    <VStack>
      <Heading textAlign={"center"}>Pokédex</Heading>
      <Center></Center>
    </VStack>
  );
}

export default App;
