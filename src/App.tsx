import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import FairyImg from "./assets/Fairy.svg";
import { PokemonClient } from "pokenode-ts";
import type { Types } from "pokenode-ts";
import { useQuery } from "@tanstack/react-query";

const getPokemon = async () => {
  const metaPokemonData = [];
  const api = new PokemonClient();
  const pokemons = await api.listPokemons(0, 1000);

  for (const pokemon of pokemons.results) {
    metaPokemonData.push(await api.getPokemonByName(pokemon.name));
  }

  return metaPokemonData.filter((pokemon) => pokemon.is_default);
};

const colors: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
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
    //p.types.find((t) => t.slot == 1)?.type
    return (
      <>
        {/* <FairyImg /> */}
        <Grid
          margin="2"
          gap="4"
          templateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
        >
          {pokemon.map((p) => (
            <GridItem>
              <Card key={p.id} background={colors[p.types[0].type.name]}>
                <CardBody>
                  <VStack>
                    <Flex width={"100%"} justifyContent={"flex-end"}>
                      {p.types.map((t) => (
                        <Image src={`./src/assets/types/${t.type.name}.svg`} />
                      ))}
                    </Flex>
                    <Image
                      boxShadow={"md"}
                      padding="1.5"
                      bgColor="blackAlpha.300"
                      borderRadius="md"
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${p.id
                        .toString()
                        .padStart(3, "0")}.png`}
                    />
                    <Flex
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>{p.name}</Text>
                    </Flex>
                  </VStack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup
                    width={"100%"}
                    justifyContent={"flex-end"}
                    spacing="2"
                  >
                    <Button
                      variant="solid"
                      colorScheme={"whiteAlpha"}
                      alignSelf="center"
                    >
                      Details
                    </Button>
                    <Button
                      variant="solid"
                      colorScheme={"blackAlpha"}
                      alignSelf="center"
                    >
                      Add to Pokedex
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
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
