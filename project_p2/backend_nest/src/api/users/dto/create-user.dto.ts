export class CreateUserDto {
      id: number;
    
      username: string; 

      email: string;

      password: string;
    
      isActive: boolean;

      public static build(): CreateUserDto {
            return new CreateUserDto();
      }

      setId(id: number) : this {
            this.id = id;
            return this
      }

      setEmail(email: string): this {
            this.email = email;
            return this;
      }

      setUserName(username: string) : this {
            this.username = username;
            return this
      }

      setPassword(password: string): this {
            this.password = password;
            return this;
      }


      setIsActive(isActive: boolean) : this {
            this.isActive = isActive
            return this
      }

}
