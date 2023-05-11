import React from 'react';

type HeaderProps = {
  title: string;
  description: string;
};

export default function Header({ title, description }: HeaderProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
