import { LiteraryQuote, GalleryItem } from '../types';

export const literaryQuotes: LiteraryQuote[] = [
  // Chinese
  { text: "这鸭子经过这一煮，皮酥肉嫩，吃到嘴里化了似的。", source: "曹雪芹《红楼梦》", category: 'zh' },
  { text: "一个人在吃到好吃的东西的时候，是不会想去自杀的。", source: "汪曾祺《岁朝清供》", category: 'zh' },
  { text: "那豆腐皮包子，咬一口满嘴流油，鲜美无比。", source: "曹雪芹《红楼梦》", category: 'zh' },
  { text: "四方食事，不过一碗人间烟火。", source: "汪曾祺", category: 'zh' },
  { text: "秋夜，吃蟹、持螯、对酒，是人生的一大乐事。", source: "梁实秋《雅舍小品》", category: 'zh' },
  { text: "最好的滋味，往往就在那最寻常的饭食之中。", source: "林清玄", category: 'zh' },
  // EN/AM
  { text: "One cannot think well, love well, sleep well, if one has not dined well.", source: "Virginia Woolf, A Room of One's Own", category: 'en' },
  { text: "There is no love sincerer than the love of food.", source: "George Bernard Shaw", category: 'en' },
  { text: "Great food is like great sex. The more you have the more you want.", source: "Gael Greene", category: 'en' },
  { text: "Laughter is brightest where food is best.", source: "Irish Proverb", category: 'en' },
  { text: "I am not a glutton - I am an explorer of food.", source: "Erma Bombeck", category: 'en' },
  { text: "Food is symbolic of love when words are inadequate.", source: "Alan D. Wolfelt", category: 'en' },
  // JK
  { text: "即使是再简单的饭菜，只要是和喜欢的人一起吃，也会觉得美味无比。", source: "安倍夜郎《深夜食堂》", category: 'jk' },
  { text: "在疲惫的时候，一碗热气腾腾的猪肉味噌汤就能拯救一切。", source: "《深夜食堂》", category: 'jk' },
  { text: "米饭的香气，是这个世界上最让人安心的味道。", source: "《小森林》", category: 'jk' },
  { text: "泡菜的味道，就是家乡的味道。", source: "韩国文学节选", category: 'jk' },
  { text: "与其说在品尝食物，不如说在品尝回忆。", source: "村上春树", category: 'jk' },
  { text: "清晨的一碗粥，比深夜的酒更温柔。", source: "日式散文", category: 'jk' },
  // EU
  { text: "Tell me what you eat, and I will tell you what you are.", source: "Anthelme Brillat-Savarin, The Physiology of Taste", category: 'eu' },
  { text: "A meal without wine is like a day without sunshine.", source: "French Proverb", category: 'eu' },
  { text: "In Italy, they add work and life on to food and wine.", source: "Robin Leach", category: 'eu' },
  { text: "Everything you see I owe to spaghetti.", source: "Sophia Loren", category: 'eu' },
  { text: "Cheese is milk's leap toward immortality.", source: "Clifton Fadiman", category: 'eu' },
  { text: "Life is a combination of magic and pasta.", source: "Federico Fellini", category: 'eu' },
  // LA
  { text: "She was so hungry that she felt her stomach was stuck to her spine.", source: "Gabriel García Márquez, One Hundred Years of Solitude", category: 'la' },
  { text: "Love for chocolate was like a religion in that house.", source: "Laura Esquivel, Like Water for Chocolate", category: 'la' },
  { text: "The magic happens in the kitchen, among the smells of onion and garlic.", source: "Isabel Allende, Aphrodite", category: 'la' },
  { text: "Corn is the soul of our people, our daily bread and our history.", source: "Latin American literature selection", category: 'la' },
  { text: "In the smell of fresh coffee, my memory finds its home.", source: "Jorge Luis Borges (attributed)", category: 'la' },
  { text: "To eat is to remember the heartbeat of the earth.", source: "Pablo Neruda", category: 'la' }
];

export const healingGalleries: GalleryItem[] = [
  {
    id: '1',
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    name: "Hearty Pumpkin Soup (南瓜浓汤)",
    introduction: "A golden elixir crafted from autumn pumpkins and light cream, designed to warm the heart on rainy days.",
    taste: "Velvety smooth with a natural sweetness and a hint of nutmeg spice.",
    recipe: ["Roast pumpkin pieces until tender", "Blend with vegetable stock and onion", "Stir in heavy cream", "Top with roasted seeds"],
    moodEffect: "Feel cocooned in a soft blanket of warmth and safety."
  },
  {
    id: '2',
    imageUrl: "https://images.unsplash.com/photo-1551811195-2ac5d2757530?auto=format&fit=crop&q=80&w=800",
    name: "Spicy Sichuan Noodles (辛香小面)",
    introduction: "Bold, energetic, and full of life. This dish uses ancient spices to awaken the senses and release stagnant energy.",
    taste: "A dance of numbing Sichuan peppercorns and fiery chili oil.",
    recipe: ["Boil wheat noodles until al dente", "Combine chili oil, soy sauce, and sesame paste", "Top with minced pork and peanuts"],
    moodEffect: "Empowered and ready to face any challenge with renewed fire."
  },
  {
    id: '3',
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800",
    name: "Lavender Honey Cake (薰衣草蜂蜜蛋糕)",
    introduction: "An ethereal dessert that mimics the scent of a summer meadow at sunset.",
    taste: "Floral, delicate, with the deep resonance of organic honey.",
    recipe: ["Cream honey and butter", "Infuse flour with dried lavender", "Bake until golden", "Glaze with lemon honey"],
    moodEffect: "Serene, tranquil, as if floating on a quiet lake."
  },
  {
    id: '4',
    imageUrl: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800",
    name: "Midnight Tonkotsu Ramen (午夜豚骨拉面)",
    introduction: "The ultimate urban comfort. Broth simmered for 12 hours to extract the very essence of umami.",
    taste: "Creamy, rich, collagen-packed soul fuel.",
    recipe: ["Simmer pork bones for 12 hours", "Season with shio or shoyu tare", "Add thin noodles, egg, and chashu"],
    moodEffect: "Utterly satisfied and emotionally grounded."
  },
  {
    id: '5',
    imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&q=80&w=800",
    name: "Clear Vegetable Broth (清心素汤)",
    introduction: "A minimalist masterpiece. Only the purest vegetables used to create a broth that cleanses and clarifies.",
    taste: "Clean, light, carrying the subtle notes of celery and thyme.",
    recipe: ["Slowly simmer carrots, leeks, and herbs", "Strain through a fine cloth", "Garnish with fresh parsley"],
    moodEffect: "Clear-headed, light, and mentally refreshed."
  },
  {
    id: '6',
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    name: "Sun-Kissed Mediterranean Salad (地中海阳光沙拉)",
    introduction: "A celebration of light. Fresh vegetables and feta cheese tossed in extra virgin olive oil.",
    taste: "Crisp, tangy, with the salinity of olives and sweetness of vine-ripened tomatoes.",
    recipe: ["Chop cucumbers, tomatoes, and red onions", "Mix with kalamata olives and feta", "Dress with lemon and oil"],
    moodEffect: "Vibrant, cheerful, and full of optimistic energy."
  }
];
