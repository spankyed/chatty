import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import { 
  AiFillWechat as ChatIcon,
  AiFillDashboard as MeterIcon,
  AiFillPlusSquare as PlusIcon 
} from "react-icons/ai";
import { IconType } from "react-icons";
import { AppShell, Aside, Burger, Button, Container, Footer, Header, MediaQuery, Navbar, Tabs, useMantineTheme } from '@mantine/core';
// import UpdateNode from "./flow"
import DialogFlow from "./actor"
import { useState } from "react";

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>Chatty Editor</title>
        <meta name="description" content="Chatbot editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Tabs defaultValue="actor-1">
        <Tabs.List>
          <Tabs.Tab value="actor-1">Actor 1</Tabs.Tab>
          <button><PlusIcon/></button>
        </Tabs.List>
        <Tabs.Panel value="actor-1" pt="xs">
        </Tabs.Panel>
      </Tabs> */}

      


          {/* <ControlButton name="Backup" /> */}
          {/* <div className="nav">
            <ControlButton name="Preview" Icon={ChatIcon}/>
            <ControlButton name="Usage" Icon={MeterIcon} />
          </div> */}

          {/* Your application here */}

        <AppShell
          styles={{
            main: {
              background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
              <p>Application navbar</p>
            </Navbar>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <p>Application sidebar</p>
              </Aside>
            </MediaQuery>
          }
          footer={
            <Footer height={60} p="md">
              Application footer
            </Footer>
          }
          header={
            <Header height={50} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <p>Application header</p>
              </div>
            </Header>
          }
        >
          <DialogFlow />
        </AppShell>

      {/* <div className={styles.containerOuter}>
      </div> */}
    </>
  );
};

export default Home;

type ButtonProps = {
  name: string;
  Icon: IconType;
  // link: string;
};

const ControlButton = ({
  name,
  Icon
  // link,
}: ButtonProps) => {
  return (
    <Button>
      <Icon />
      {name}
    </Button>
  );
};

// const ControlButton = ({
//   name,
//   Icon
//   // link,
// }: ButtonProps) => {
//   return (
//     <button className={styles.card}>
//       <Icon />
//       <h2 className={styles.cardTitle}>{name}</h2>
//       {/* <a
//         className={styles.buttonLink}
//         href={link}
//         target="_blank"
//         rel="noreferrer"
//       >
//         Documentation
//       </a> */}
//     </button>
//   );
// };
