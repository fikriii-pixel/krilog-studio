import { prisma } from '@/lib/prisma'

// Ini kode untuk mengambil data dari database
async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function Home() {
  const posts = await getPosts()
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        📝 DevLog Studio
      </h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="border p-6 rounded-lg">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <p className="text-sm text-gray-400 mt-4">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </main>
  )
}