import { MetaTags } from '@redwoodjs/web'

import {
  CodeIcon,
  // CogIcon,
  // CollectionIcon,
  // ColorSwatchIcon,
  DatabaseIcon,
  // GlobeAltIcon,
  // LightningBoltIcon,
  // ShieldCheckIcon,
  // TemplateIcon,
} from '@heroicons/react/outline'

const AboutPage = () => {
  const features = [
    {
      name: 'RedwoodJS',
      description: 'Framework for startups',
      icon: CodeIcon,
      href: 'https://www.redwoodjs.com',
    },
    {
      name: 'Prisma',
      description: 'Prisma....',
      icon: DatabaseIcon,
      href: 'https://www.prisma.ios',
    },
    {
      name: 'tmdb api',
      description: 'tmdb....',
      icon: DatabaseIcon,
      href: 'https://developers.themoviedb.org/3/getting-started/introduction',
    },
  ]

  const faqs = [
    {
      id: 1,
      question: 'scripts',
      answer: 'exec script',
    },
    {
      id: 2,
      question: 'seeds',
      answer: 'db seed',
    },
  ]

  return (
    <>
      <MetaTags title="About" description="About page" />

      <div className="relative py-4 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-red-900 uppercase">
            How we Built with RedwoodJS
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-300">
            Everything you need to develop a web app
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Build your application like this one ... faster and easier
          </p>
          <div className="my-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <a href={feature.href}>
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-red-900 rounded-md shadow-lg">
                            <feature.icon
                              className="h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white  rounded-lg">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Technologies Used
            </h2>
            <div className="mt-12">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
                {faqs.map((faq) => (
                  <div key={faq.id}>
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage
