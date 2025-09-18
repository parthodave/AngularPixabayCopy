import { Photo } from './models';

const users = [
  { id: 1, name: 'Alex Rivera', avatarUrl: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, name: 'Sam Carter', avatarUrl: 'https://i.pravatar.cc/100?img=5' },
  { id: 3, name: 'Taylor Brooks', avatarUrl: 'https://i.pravatar.cc/100?img=8' },
  { id: 4, name: 'Jamie Lee', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
  { id: 5, name: 'Jordan Kim', avatarUrl: 'https://i.pravatar.cc/100?img=16' },
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

const categories = ['nature', 'animals', 'backgrounds', 'buildings', 'business', 'computer', 'education', 'fashion', 'feelings', 'food', 'health', 'industry', 'music', 'people', 'places', 'religion', 'science', 'sports', 'transportation', 'travel'];
const colors = ['red', 'orange', 'yellow', 'green', 'turquoise', 'blue', 'lilac', 'pink', 'white', 'gray', 'black', 'brown'] as const;

const baseTags = ['nature', 'forest', 'mountain', 'lake', 'sunset', 'beach', 'river', 'tree', 'flower', 'sky', 'snow', 'wildlife', 'bird', 'cat', 'dog'];

export const MOCK_PHOTOS: Photo[] = Array.from({ length: 60 }).map((_, i) => {
  const id = 1000 + i;
  const w = pick([640, 720, 800, 960, 1024, 1200]);
  const h = pick([480, 540, 600, 720, 800]);
  const cat = pick(categories);
  const user = pick(users);
  const tagSet = new Set<string>();
  while (tagSet.size < 4) tagSet.add(pick(baseTags));
  const tagArr = Array.from(tagSet);
  const color = pick(colors as unknown as string[]);
  const createdAt = new Date(Date.now() - rand(0, 1000) * 86400000).toISOString();
  return {
    id,
    pageURL: `https://example.com/photos/${id}`,
  previewURL: `https://picsum.photos/seed/${id}-p/300/200`,
    webformatURL: `https://picsum.photos/seed/${id}-w/${Math.max(600, w)}/${Math.max(400, h)}`,
    largeImageURL: `https://picsum.photos/seed/${id}-l/${Math.max(1200, w)}/${Math.max(800, h)}`,
    width: w,
    height: h,
    type: 'photo',
    orientation: w >= h ? 'horizontal' : 'vertical',
    color,
    category: cat,
    tags: tagArr,
    user,
    likes: rand(0, 5000),
    comments: rand(0, 500),
    downloads: rand(0, 20000),
    views: rand(100, 100000),
    createdAt,
  } as Photo;
});
