import { useState } from 'react';

import { theme } from '../../App';

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: theme.spacing(8) }}
    >
      Home
    </div>
  )
}
