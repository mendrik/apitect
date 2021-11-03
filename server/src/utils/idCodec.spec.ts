import { ObjectId } from 'mongodb'
import { TreeNode } from '~shared/algebraic/treeNode'

describe('idCodec', () => {
  it('validates', () => {
    const docId = new ObjectId()
    expect(ObjectId.isValid(docId)).toBe(true)
  })

  const tree = {
    name: 'root',
    children: [
      {
        name: 'Starks',
        wikiSuffix: 'House_Stark',
        children: [
          {
            name: 'Eddard "Ned" Stark',
            description:
              'Lord of Winterfell - Warden of the North - Hand of the King - Married to Catelyn (Tully) Stark',
            imageSuffix: 'eddard-stark',
            wikiSuffix: 'Eddard_Stark',
            children: [
              {
                name: 'Robb Stark',
                description: 'Son of Eddard and Catelyn Stark - Direwolf: Grey Wind',
                imageSuffix: 'robb-stark',
                wikiSuffix: 'Robb_Stark'
              },
              {
                name: 'Sansa Stark',
                description: 'Daughter of Eddard and Catelyn Stark - Direwolf: Lady',
                imageSuffix: 'sansa-stark',
                wikiSuffix: 'Sansa_Stark'
              },
              {
                name: 'Arya Stark',
                description: 'Daughter of Eddard and Catelyn Stark - Direwolf: Nymeria',
                imageSuffix: 'arya-stark',
                wikiSuffix: 'Arya_Stark'
              },
              {
                name: 'Brandon "Bran" Stark',
                description: 'Son of Eddard and Catelyn Stark - Direwolf: Summer',
                imageSuffix: 'brandon-stark',
                wikiSuffix: 'Brandon_Stark'
              },
              {
                name: 'Rickon Stark',
                description: 'Son of Eddard and Catelyn Stark - Direwolf: Shaggydog',
                imageSuffix: 'rickon-stark',
                wikiSuffix: 'Rickon_Stark'
              }
            ]
          },
          {
            name: 'Benjen Stark',
            description: "Brother of Eddard Stark - First ranger of the Night's Watch",
            imageSuffix: 'benjen-stark',
            wikiSuffix: 'Benjen_Stark'
          },
          {
            name: 'Jon Snow',
            description:
              "Bastard son of Eddard Stark - Steweard in the Night's Watch - Direwolf: Ghost",
            imageSuffix: 'jon-snow',
            wikiSuffix: 'Jon_Snow'
          }
        ]
      },
      {
        name: 'Lannisters',
        wikiSuffix: 'House_Lannister',
        children: [
          {
            name: 'Tywin Lannister',
            description: 'Lord of Casterly Rock - Warden of the West',
            imageSuffix: 'tywin-lannister',
            wikiSuffix: 'Tywin_Lannister',
            children: [
              {
                name: 'Tyrion Lannister',
                description: 'Son of Tywin Lannister - The Imp',
                imageSuffix: 'tyrion-lannister',
                wikiSuffix: 'Tyrion_Lannister'
              },
              {
                name: 'Jaime Lannister',
                description: 'The Kingslayer - Knight of the Kingsgaurd - Son of Tywin Lannister',
                imageSuffix: 'jaime-lannister',
                wikiSuffix: 'Jaime_Lannister'
              },
              {
                name: 'Queen Cersei (Lannister) Baratheon',
                description: 'Married to King Robert Baratheon - Daughter of Tywin Lannister',
                imageSuffix: 'cersei-lannister',
                wikiSuffix: 'Cersei_Lannister'
              }
            ]
          }
        ]
      },
      {
        name: 'Baratheons',
        wikiSuffix: 'House_Baratheon',
        children: [
          {
            name: 'King Robert Baratheon',
            description: 'The first of his name - Lord of the Seven Kingdoms',
            imageSuffix: 'robert-baratheon',
            wikiSuffix: 'Robert_Baratheon'
          },
          {
            name: 'Stannis Baratheon',
            description: 'Lord of Dragonstone - Master of Ships - Brother of Robert Baratheon',
            imageSuffix: 'stannis-baratheon',
            wikiSuffix: 'Stannis_Baratheon'
          },
          {
            name: 'Renly Baratheon',
            description: "Lord of Storm's End - Master of Laws - Brother of Robert Baratheon",
            imageSuffix: 'renly-baratheon',
            wikiSuffix: 'Renly_Baratheon'
          },
          {
            name: 'Joffrey Baratheon',
            description: 'Heir to the Iron Throne - Son of Robert and Cersei Baratheon',
            imageSuffix: 'joffrey-baratheon',
            wikiSuffix: 'Joffrey_Baratheon'
          },
          {
            name: 'Tommen Baratheon',
            description: 'Son of Robert and Cersei Baratheon',
            imageSuffix: 'tommen-baratheon',
            wikiSuffix: 'Tommen_Baratheon'
          },
          {
            name: 'Myrcella Baratheon',
            description: 'Daughter of Robert and Cersei Baratheon',
            imageSuffix: 'myrcella-baratheon',
            wikiSuffix: 'Myrcella_Baratheon'
          }
        ]
      },
      {
        name: 'Targaryens',
        wikiSuffix: 'House_Targaryen',
        children: [
          {
            name: 'Daenerys Targaryen',
            description:
              'Stormborn - Khaleesi of the Dothraki - The Unburnt - Mother of Dragons - Daughter of Aerys II Targaryen "The Mad King"',
            imageSuffix: 'daenerys-targaryen',
            wikiSuffix: 'Daenerys_Targaryen'
          },
          {
            name: 'Viserys Targaryen',
            description: 'The Beggar King - Son of Aerys II Targaryen "The Mad King"',
            imageSuffix: 'viserys-targaryen',
            wikiSuffix: 'Viserys_Targaryen'
          }
        ]
      },
      {
        name: 'Greyjoys',
        wikiSuffix: 'House_Greyjoy',
        children: [
          {
            name: 'Balon Greyjoy',
            description: 'Lord Reaper of Pyke - Head of House Greyjoy',
            imageSuffix: 'balon-greyjoy',
            wikiSuffix: 'Balon_Greyjoy'
          },
          {
            name: 'Theon Greyjoy',
            description: 'Ward of the Starks - Heir to the Iron Islands - Son of Balon Greyjoy',
            imageSuffix: 'theon-greyjoy',
            wikiSuffix: 'Theon_Greyjoy'
          },
          {
            name: 'Yara Greyjoy',
            description: 'Ironborn - Son of Balon Greyjoy',
            imageSuffix: 'yara-greyjoy',
            wikiSuffix: 'Yara_Greyjoy'
          }
        ]
      },
      {
        name: 'Tyrells',
        wikiSuffix: 'House_Tyrell',
        children: [
          {
            name: 'Margaery (Tyrell) Baratheon',
            description:
              'Wife of Renly Baratheon - Sister of Loras Tyrell - Granddaughter of Olenna Tyrell',
            imageSuffix: 'margaery-tyrell',
            wikiSuffix: 'Margaery_Tyrell'
          },
          {
            name: 'Loras Tyrell',
            description:
              'Heir to Highgarden - Commander of the Kings Gaurd - Brother of Margaery Baratheon',
            imageSuffix: 'loras-tyrell',
            wikiSuffix: 'Loras_Tyrell'
          }
        ]
      },
      {
        name: 'Tullys',
        wikiSuffix: 'House_Tully',
        children: [
          {
            name: 'Catelyn (Tully) Stark',
            description: 'Married to Eddard Stark - Daughter of Hoster Tully',
            imageSuffix: 'catelyn-tully',
            wikiSuffix: 'Catelyn_Tully'
          },
          {
            name: 'Lysa (Tully) Arryn',
            description: 'Widow of Jon Arryn - Daughter of Hoster Tully',
            imageSuffix: 'lysa-tully',
            wikiSuffix: 'Lysa_Tully'
          },
          {
            name: 'Edmure Tully',
            description: 'Heir to Riverrun - Son of Hoster Tully',
            imageSuffix: 'edmure-tully',
            wikiSuffix: 'Edmure_Tully'
          },
          {
            name: 'Brynden Tully',
            description: 'Lord of Riverrun - Head of House Tully - Brother of Hoster Tully',
            imageSuffix: 'brynden-tully',
            wikiSuffix: 'Brynden_Tully'
          }
        ]
      },
      {
        name: 'Redwyne',
        wikiSuffix: 'House_Redwyne',
        children: [
          {
            name: 'Olenna (Redwyne) Tyrell',
            description: 'Matriarch of House Tyrell - Queen of Thorns',
            imageSuffix: 'olenna-tyrell',
            wikiSuffix: 'Olenna_Tyrell'
          }
        ]
      },
      {
        name: 'Freys',
        wikiSuffix: 'House_Freys',
        children: [
          {
            name: 'Walder Frey',
            description: 'Lord of the Crossing - Head of House Frey',
            imageSuffix: 'walder-frey',
            wikiSuffix: 'Walder_Frey'
          }
        ]
      },
      {
        name: 'Arryns',
        wikiSuffix: 'House_Arryns',
        children: [
          {
            name: 'Jon Arryn',
            description:
              'Lord of the Eyrie - Head of House Arryn - Warden of the East - Defender of the Vale',
            imageSuffix: 'jon-arryn',
            wikiSuffix: 'Jon_Arryn'
          }
        ]
      },
      {
        name: 'Dothrakis',
        wikiSuffix: 'House_Dothrakis',
        children: [
          {
            name: 'Khal Drogo',
            description:
              'Leader of the Dothraki children - Dothraki Warlord - Married to Daenerys Targaryen',
            imageSuffix: 'khal-drogo',
            wikiSuffix: 'Drogo'
          }
        ]
      }
    ]
  }

  it('fix me', () => {
    const t: TreeNode<any> = TreeNode.from<any, any>('children')(tree)
    const res = t.map((x: object) => ({ ...x, _id: `ObjectId("${new ObjectId()}")` }))
    console.log(res.toString())
  })
})
