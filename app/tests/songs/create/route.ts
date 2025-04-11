import { createSong, CreateSongInput } from "@/lib/actions/songs";
import { currentUser } from "@clerk/nextjs/server";

const data: Omit<CreateSongInput, "lyrics"> = {
  title: "Anjeliko",
  artists: [
    {
      name: "Mirado",
      bio: `Depuis son adolescence, Mirado a fait chavirer des cœurs avec sa voix captivante et 
      son charme irrésistible avec des titres tels que « Tiako Ianao », « Lay Anjeliko », ou « Trano bongo ». 
      Aujourd'hui, après des années à séduire ses fans, il revient avec « Rahatrizay », r
      évélant un homme mature, prêt à raconter ses histoires à travers un nouvel album qui promet d'être aussi 
      touchant que ses premiers succès.
      `,
    },
  ],

  album: {
    title: "Ilay Anjeliko",
    coverUrl:
      "https://cdn-images.dzcdn.net/images/cover/2b21cbcbd9b16d67f41fdef90650f9b4/500x500-000000-80-0-0.jpg",
    releaseDate: new Date("2023-07-03"),
  },
};

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const newSong = await createSong({
      ...data,
      lyrics: {
        createdBy: user.id,
        content: `
Manimanina azy aho izany.
F’izy ilay nambabo fo
Tsy miala ato an-doha
Lasa lavitra ahy izy izay
Ka niverina ato an-doha,
Endrika kanto tokoa

Hanihany, tsiky, sangisangy
No nameno ny fo
Feno tsiky ny androko
Fa dia tena kanto izy izay
Bika tarehy ihany koa
Tsara fanahy manao soa

[chorus]
Dia ’lay tiako, ’lay niriako
’lay tato am-poko hatrizay
Dia lay foko no nitempo
Ho ahy tsisy afa tsy izy ihany,
No nataoko anjeliko
Anilako hiambina ahy
Nolazaiko, tantaraiko
Fa izy lay sady tiako no tia ahy!

[vers 2]
Navelako azy anie ny foko
Navelako anjakany
F’izaho azy irery ihany
Foiko ho anao ny amiko manontolo
Foiko avokoa r’ilay anjeliko

Hanihany, tsiky, sangisangy
No nameno ny fo
Feno tsiky ny androko
Fa dia tena kanto izy izay
Bika tarehy ihany koa
Tsara fanahy manao soa

[bridge]
Alahelo sy tomany raha izao irery ihany
Raha avelanao eto aho, fantatrao f’ijaly

Dia ilay tiako, ilay niriako
Ilay ho ato am-poko rahatrizay
Ho ato am-poko, tsy soloiko
Ho ahy tsisy afa-tsy izy ihany
No nataoko, anjeliko
Anilako hiambina ahy
Nolazaiko, tantaraiko
Fa izy sady tiako no tia ahy
        `,
      },
    });
    return Response.json(newSong);
  } catch (error) {
    console.log(error);
    return new Response("Error creating song", { status: 500 });
  }
}
