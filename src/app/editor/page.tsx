import { PlateEditor } from '@/components/editor/plate-editor';

export default function Page() {
  return (
    <div className='h-6/12 w-6/12 m-8' data-registry='plate'>
      <PlateEditor />
    </div>
  );
}
