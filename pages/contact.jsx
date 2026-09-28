import React from 'react';
import { Hero } from '../components/Hero';
import { Layout } from '../components/Layout';

const Contact = () => (
  <Layout>
    <div className="grid grid-cols-1 gap-16 items-center justify-items-center">
      <Hero image="/images/vale-email.png" height="300" width="300" />
      <div className="text-center opacity-85 text-sm md:text-base">
        <a
          className="text-gray text-3xl lg:text-4xl tracking-wide font-roboto w-full relative no-underline "
          href="mailto:adityams.dev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get in touch 💌
        </a>
      </div>
      <div className="text-xl md:text-xl lg:text-2xl text-center">
        <span className="font-light text-sm italic">
          Don't be a <strike>stranger</strike>.
        </span>
        <div className="my-2">
          Say <a href="mailto:adityams.dev@gmail.com">Hi</a>{' '}
          <span className="wave-emoji text-2xl">👋🏻</span> or follow me on:{' '}
        </div>
        <div className="flex flex-col my-12 sm:block">
          <a
            className="font-telex font-bold hover:underline"
            href="https://dribbble.com/frontendvale"
            target="_blank"
          >
            Dribbble
          </a>{' '}
          🎨 ,{' '}
          <a
            className="font-telex font-bold hover:underline"
            href="https://www.instagram.com/codewithvale/"
            target="_blank"
          >
            Instagram
          </a>{' '}
          📸 ,{' '}
          <a
            className="font-telex font-bold hover:underline"
            href="https://www.github.com/vale-c/"
            target="_blank"
          >
            GitHub
          </a>{' '}
          💻 ,{' '}
          <a
            className="font-telex font-bold hover:underline"
            href="https://www.linkedin.com/in/calabresevalentina/"
            target="_blank"
          >
            LinkedIn
          </a>{' '}
          💼 ,{' '}
          <a
            className="font-telex font-bold hover:underline"
            href="https://medium.com/@vale-dev"
            target="_blank"
          >
            Medium
          </a>{' '}
          📝 ,{' '}
          <a
            className="font-telex font-bold hover:underline"
            href="https://www.x.com/valecodes/"
            target="_blank"
          >
            𝕏
          </a>{' '}
        </div>
      </div>
    </div>
  </Layout>
);

export default Contact;
