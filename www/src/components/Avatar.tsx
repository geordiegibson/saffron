import * as Avatar from '@radix-ui/react-avatar';

const ProfilePicture = () => (
  <div className="flex gap-5">
    <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src=""
        alt="Colm Tuite"
      />
      <Avatar.Fallback
        className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
        delayMs={600}
      >
        GG
      </Avatar.Fallback>
    </Avatar.Root>
  </div>
);

export default ProfilePicture;
